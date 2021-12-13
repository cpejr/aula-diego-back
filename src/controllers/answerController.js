const answerModel = require("../models/AnswerModel");
const exerciseModel = require("../models/ExerciseModel");

module.exports = {
  async create(request, response) {
    try {
      const answer = request.body;
      const exercise = await exerciseModel.getById(answer.exercise_id);

      if (!exercise.open || exercise.end_date < new Date()) {
        return response.status(400).json({
          message: "Este exercício foi fechado e não pode mais ser respondido",
        });
      }

      if (answer.evaluate) {
        let correct = 0;

        answerSheet = Object.values(exercise.questions).map(
          (question) => question.correct
        );
        answers = Object.values(answer.answers);

        answers.map((answer, index) => {
          if (answer === answerSheet[index]) correct += 1;
        });

        answer.grade = Math.round((correct / answers.length) * 100);
      }

      delete answer.evaluate;
      const id = await answerModel.create(answer);

      response.status(200).json({ id: id[0] });
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await answerModel.read(filters);

      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundExam = await answerModel.getById(id);

      if (!foundExam) {
        return response
          .status(404)
          .json({ message: "Resposta não encontrada." });
      } else {
        await answerModel.delete(id);
        response
          .status(200)
          .json({ message: "Resposta deletada com sucesso." });
      }
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const answer = await answerModel.getById(id);

      return response.status(200).json(answer);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const answer = request.body;

      const res = await answerModel.update(answer, id);
      if (res !== 1) {
        return response
          .status(400)
          .json({ message: "Resposta não encontrada!" });
      } else {
        return response
          .status(200)
          .json({ message: "Resposta alterada com sucesso" });
      }
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
