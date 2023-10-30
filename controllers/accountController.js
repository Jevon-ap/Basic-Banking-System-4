const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();
exports.createAccount = async (req, res) => {
    const { userId, bank_name, bank_account_number, balance } = req.body;

    try {
        const newAccount = await prisma.bankAccount.create({
            data: {
                userId: userId,
                bank_name: bank_name,
                bank_account_number: bank_account_number,
                balance: balance
            }
        });

        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await prisma.bankAccount.findMany();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAccountById = async (req, res) => {
    const accountId = parseInt(req.params.accountId);
    try {
        const account = await prisma.bankAccount.findUnique({
            where: { id: accountId }
        });
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};