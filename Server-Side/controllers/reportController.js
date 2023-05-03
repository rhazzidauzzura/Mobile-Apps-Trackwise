const { sendFile } = require("../helpers/cloudinary");
const { Report } = require("../models");

class reportController {
  static async getReport(req, res, next) {
    try {
      let reports = await Report.findAll({
        order: [["createdAt", "asc"]],
      });
      res.status(200).json(reports);
    } catch (error) {
      next(error);
    }
  }

  static async postReport(req, res, next) {
    try {
      let { name, age, characteristic, long, lat } = req.body;
      console.log(req.file);
      const file = req.file;

      if (!file) {
        throw { name: "NotFound" };
      }

      const result = await sendFile(file);

      console.log(result);
      const photo = result.secure_url;

      const report = await Report.create({ name, age, characteristic, long, lat, photo });

      res.status(201).json({ message: "Report Sent Successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getReportById(req, res, next) {
    try {
      const { id } = req.params;
      const reportById = await Report.findOne({ where: { id } });
      if (!reportById) {
        return res.status(404).json({ message: `Report Not Found` });
      }
      res.status(200).json(productById);
    } catch (error) {
      next(error);
    }
  }

  static async editReportById(req, res, next) {
    try {
      const { reportId } = req.params;
      const { name, age, characteristic, long, lat, photo } = req.body;

      const findReport = await Report.findByPk(reportId);
      const editReport = await findReport.update({ name, age, characteristic, long, lat, photo });

      res.status(200).json({ message: `Report Success Updated` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteReport(req, res, next) {
    try {
      const { reportId } = req.params;
      const reportById = await Report.destroy({ where: { id: reportId } });
      if (!reportById) {
        return res.status(404).json({ message: `Report Not Found` });
      }
      res.status(200).json({ message: "Report Delete Successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = reportController;