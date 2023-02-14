const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		// for mongoose pre-version 7
		mongoose.set('strictQuery', false)
		
		const conn = await mongoose.connect(process.env.MONGO_URI)

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

	} catch (error) {
		console.log(error)
		process.exit(1)		
	}
}

module.exports = connectDB