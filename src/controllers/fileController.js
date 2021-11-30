const FileModel = require("../models/FileModel");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const { upload, download } = require("../services/wasabi");
const fs = require("fs");

async function uploadFile(file, file_id, user_id) {
  const fileExtension = file.name.match(/(?<=\.).+/)[0];

  const filestream = fs.readFileSync(file.path);
  const result = await upload(`${file_id}.${fileExtension}`, filestream);

  const fileData = {
    id: file_id,
    name: file.name,
    type: fileExtension,
    path: result.Location,
    user_id: user_id,
  };

  await FileModel.create(fileData);
}

module.exports = {
  async create(request, response) {
    try {
      const data = request.body;
      const fileType = data.file_type.match(/.+(?=\/)/)[0];
      const fileExtension = data.file_original.match(/(?<=\.).+/)[0];
      const file_id = uuidv4();

      if (fileType !== "image") {
        console.warn("Not a image");
        response.status(500).json({ message: "Internal server error" });
      }

      const image = {
        id: file_id,
        name: data.file_name,
        type: fileExtension,
        path: `${file_id}.${fileExtension}`,
        user_id: data.user_id,
      };

      await FileModel.create(image);
      response.status(200).json({ file_id: file_id });
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async uploadMultipleFiles(request, response) {
    try {
      const form = new formidable.IncomingForm();
      const promises = [];
      const ids = [];

      form.parse(request, async (error, fields, files) => {
        if (error) {
          response.status(500).json({ message: "Internal server error" });
        }

        const filenames = Object.keys(files);

        filenames.forEach(async (filename) => {
          const file_id = uuidv4();
          ids.push(file_id);
          promises.push(
            uploadFile(files[filename], file_id, request.session.user.id)
          );
        });
        await Promise.all(promises);
        response.status(200).json({ file_ids: ids });
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Internal server error" });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundlesson = await lessonModel.getById(id);

      if (!foundlesson) {
        throw new Error("Aula não encontrada.");
      } else {
        await lessonModel.deletelesson(id);
        response.status(200).json("Aula deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async read(request, response) {
    try {
      const filters = request.params;
      const result = await FileModel.read(filters);
      response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getFile(request, response) {
    try {
      const { id } = request.params;

      const file = await FileModel.getById(id);
      const fileKey = `${file.id}.${file.type}`;

      const { Body } = await download(fileKey);

      response.json({ base64: Body.toString("base64"), url: file.path });
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const newLesson = request.body;

      newLesson.updated_at = datetime.getTime();

      const res = await lessonModel.updatelesson(id, newLesson);
      if (res !== 1) {
        return response.status(400).json("Aula não encontrada!");
      } else {
        return response.status(200).json("Aula alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
