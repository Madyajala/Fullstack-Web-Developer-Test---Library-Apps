const {
  Book,
  Student,
  Transaction,
  DetailTransaction,
  Inventory,
  History,
} = require("../models");
const hitungTanggalKembali = require("../helper/batasLoan");

class Controller {
  static async addBook(req, res) {
    try {
      const { title, author, year } = req.body;
      const data = await Book.create({ title, author, year });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async addStudent(req, res) {
    try {
      const { name, major } = req.body;
      const data = await Student.create({ name, major });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async addStock(req, res) {
    try {
      const id = +req.params.id;
      const { stock } = req.body;
      const data = await Inventory.increment(
        { stock: stock },
        { where: { id } }
      );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async createTransaction(req, res) {
    try {
      const { NIM, BukuId, total, status, TransactionId } = req.body;

      // const mahasiswa = Student.find((s) => s.id === StudentId);
      // if (!mahasiswa) {
      //   return res
      //     .status(400)
      //     .json({ error: "Mahasiswa tidak aktif atau tidak ditemukan." });
      // }

      const returnDate = hitungTanggalKembali(new Date());

      const transaksi = await Transaction.create({
        NIM,
        return: returnDate,
        loan: new Date(),
      });

      await DetailTransaction.create({
        NIM: transaksi.NIM,
        BukuId,
        total,
        status,
        TransactionId,
      });

      res
        .status(201)
        .json({ message: "Transaksi peminjaman berhasil ditambahkan" });
    } catch (error) {
      console.log(error);
    }
  }

  static async viewHistory(req, res) {
    try {
      const {
        NIM,
        name,
        BukuId,
        title,
        loan,
        return: tglKembali,
        LamaPinjam,
      } = req.query;
      const filterOptions = {};

      if (NIM) filterOptions["$student.id$"] = { [Op.like]: `%${NIM}%` };
      if (name) filterOptions["$student.name$"] = { [Op.like]: `%${name}%` };
      if (BukuId) filterOptions["$book.id$"] = BukuId;
      if (title) filterOptions["$book.title$"] = { [Op.like]: `%${title}%` };
      if (loan) filterOptions["$transaction.loan$"] = loan;
      if (tglKembali) filterOptions["$transaction.return$"] = tglKembali;
      if (LamaPinjam) {
        const dateFilter = new Date();
        dateFilter.setDate(dateFilter.getDate() - parseInt(LamaPinjam));
        filterOptions["$transaction.loan$"] = {
          [Op.gte]: dateFilter,
        };
      }

      const reports = await DetailTransaction.findAll({
        include: [
          {
            model: Transaction,
            include: [
              {
                model: Student,
                attributes: ["id", "name"],
              },
            ],
            attributes: ["loan", "return"],
          },
          {
            model: Book,
            attributes: ["id", "title"],
          },
        ],
        where: filterOptions,
      });

      // const data = await History.findAll();
      res.status(200).json(reports);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
