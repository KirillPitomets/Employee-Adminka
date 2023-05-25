module.exports = class UserDto {
	id
	name
	email

	constructor(model) {
		this.id = model.id
		this.email = model.email
		this.name = model.name
	}
}
