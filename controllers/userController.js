const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password, profile } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                name: name, 
                email: email,  
                password: password,  
                profile: {
                    create: profile  
                }
            }
        });

        res.status(201).json(newUser);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            profile: true
        }
    });
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true }
    });
    res.json(user);
};