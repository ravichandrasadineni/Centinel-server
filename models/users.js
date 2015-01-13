/**
 * Created by ravichandrasadineni on 1/13/15.
 */
var mongoose = require(mongoose);
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type:String, required:true},
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});
UserSchema.pre(save, function(next) {
    var user = this;
    
    if (!user.isModified('password')) return next();


    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);


            user.password = hash;
            next();
        });
    });

});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
mongoose.model('users', usersSchema);