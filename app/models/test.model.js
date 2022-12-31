module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            someField: { type: String, default: '' },
            validated: { type: Boolean, default: false },
            activity: { type: Object, default: {} },
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Test = mongoose.model("test", schema);

    return Test;
};