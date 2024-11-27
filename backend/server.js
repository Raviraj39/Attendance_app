const app = require("./App");

// Load environment variables
require("dotenv").config();

// Set up the server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
