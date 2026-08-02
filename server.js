const express = require("express");

const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./openapi.json");

const { pool, initializeDatabase } = require("./database");

const supabase = require("./supabase");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.post("/auth/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({
                error: error.message,
            });
        }

        return res.status(201).json(data.user);

    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({
                error: "Invalid login credentials"
            });
        }

        return res.status(200).json({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks");

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({
            error: "Database error"
        });
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({
            error: "Database error"
        });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const title = req.body.title;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks (title, done)
             VALUES ($1, $2)
             RETURNING *`,
            [title.trim(), false]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({
            error: "Database error"
        });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, done } = req.body;

        if (title === undefined && done === undefined) {
            return res.status(400).json({
                error: "Nothing to update"
            });
        }

        const existing = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        const updatedTitle =
            title !== undefined ? title.trim() : existing.rows[0].title;

        const updatedDone =
            done !== undefined ? done : existing.rows[0].done;

        await pool.query(
            `UPDATE tasks
             SET title = $1, done = $2
             WHERE id = $3`,
            [updatedTitle, updatedDone, id]
        );

        const updatedTask = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        res.json(updatedTask.rows[0]);
    } catch (err) {
        res.status(500).json({
            error: "Database error"
        });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({
            error: "Database error"
        });
    }
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);

            if (supabase) {
                console.log("Connected to Supabase");
            }
        });
    })
    .catch((err) => {
        console.error("Database initialization failed:", err);
    });