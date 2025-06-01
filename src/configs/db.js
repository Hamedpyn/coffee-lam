import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(process.env.MONGO_URL)
            console.log('Connected!')
        }
        return false;

    } catch (err) {
        console.log('Error!', err)
    }
}
export default connectToDB;