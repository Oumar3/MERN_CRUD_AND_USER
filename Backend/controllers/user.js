const {User} = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const loginUser = async (req,res)=>{

    try {
        const {email,password} = req.body

        // Vérifier si l'email et le mot de passe sont fournis
        if(!email || !password){
            return res.status(400).json({ message: 'All fields must be filled' });
        }

        // Rechercher l'utilisateur dans la base de données
        const user = await User.findOne({email})

        // Vérifier si l'utilisateur existe
        if(!user){
            return res.status(400).json({ message: 'Email incorrect' });
         }

        // Comparer les mots de passe hashés
        const match = await bcrypt.compare(password,user.password)

         // Vérifier si les mots de passe correspondent
        if(!match){
            return res.status(400).json({ message: 'Password incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user._id, email: user.email },process.env.SECRET_KEY,{ expiresIn: '1h' })
        
        // Répondre avec l'email et le token
        res.status(200).json({email,token})

    } catch (error) {
        res.status(500).json({e:error.message})
    }
}


    

    


const SignUpUser = async (req,res)=>{
    const {email,password} = req.body

    // Vérifier si l'email et le mot de passe sont fournis
    if(!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
    }

    const hashPassword = await bcrypt.hash(password,10)
    
    const exist = await User.findOne({email})
    if(exist){
       return res.status(400).json({ message: 'Email already in use' });
    }

    try {
        // Créer un nouvel utilisateur dans la base de données
        const newUser = await User.create({email,password:hashPassword})

        // Générer un token JWT
        const token = jwt.sign({ userId: newUser._id, email: newUser.email },process.env.SECRET_KEY,{ expiresIn: '1h' })
        
       // Répondre avec l'email et le token
         res.status(201).json({email,token})
    } 
    
    catch (error) {
        res.status(500).json({e:error.message})
    }
}

module.exports = {loginUser,SignUpUser}