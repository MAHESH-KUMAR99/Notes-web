const moongoose = require("mongoose");
const noteSchema = moongoose.Schema(
    {
        title: String,
        description: String,
        
    },
    {timestamps: true}
);

const Note = moongoose.model("Note", noteSchema);
module.exports = Note;