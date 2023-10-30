const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
exports.createTransaction = async (req, res) => {
    const { source_account_id, destination_account_id, amount } = req.body;

    try {
        const sourceAccount = await prisma.bankAccount.update({
            where: { id: source_account_id },
            data: { balance: { decrement: amount } }
        });

        const destinationAccount = await prisma.bankAccount.update({
            where: { id: destination_account_id },
            data: { balance: { increment: amount } }
        });

        const newTransaction = await prisma.transaction.create({
            data: {
                source_account_id: source_account_id,
                destination_account_id: destination_account_id,
                amount: amount
            }
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactionById = async (req, res) => {
    const transactionId = parseInt(req.params.transactionId);

    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
            include: {
                sourceAccount: true,
                destinationAccount: true
            }
        });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};