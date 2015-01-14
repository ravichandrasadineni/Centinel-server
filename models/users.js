/**
 * Created by ravichandrasadineni on 1/13/15.
 */
var mongoose = require(mongoose);
var bcrypt = require(bcrypt);
var Schema = mongoose.Schema;
var IP_LEN = 19;
var COUNTRY_CODE = 2;
var UserSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    last_ip : {type: String, required: true},
    last_seen : {type: Date},
    registered_date :{type: Date, default: Date.now, required: true},
    has_given_consent : {type: Boolean, required:true},
    date_given_consent: {type: Date, default: Date.now, required: true},
    typeable_handle: {type: String,required: true},
    is_vpn : {type: Boolean,required: true},
    country : {type: String,required: true}
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