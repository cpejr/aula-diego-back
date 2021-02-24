exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("organization")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("organization").insert([
        {
          id: "29f16c78-d17d-43d2-b357-c7ce9a32c1d3",
          name: "Bombeiros",
          description:
            "Bombeiros são entidades da Proteção Civil cujos membros, são treinados para atuarem em caso de incêndios, para resgatar pessoas de acidentes de trânsito, desmoronamentos de edifícios, desastres naturais, salvamento em grande ângulo, alguns possuem equipamentos de matérias perigosas e fornecem serviços de emergência médica e pré-hospitalar. O serviço de combate a incêndios e serviços de resgate é conhecido em alguns países como 'brigada de incêndio'.",
          created_at: "2021-02-11 23:55:55",
          updated_at: "2021-02-11 23:55:55",
          is_deleted: false,
        },
        {
          id: "ad0fa041-fff4-4985-a462-2d9f160d7f46",
          name: "CPEJr",
          description:
            "A CPE é a empresa de tecnologia sediada na UFMG focada na entrega de soluções de engenharia e de desenvolvimento web. Temos orgulho de contribuir para o crescimento de negócios e para a criação de produtos personalizados para nossos clientes e parceiros.",
          created_at: "2021-02-11 23:55:55",
          updated_at: "2021-02-11 23:55:55",
          is_deleted: true,
        },
        {
          id: "d9b6db58-86ce-4686-afb4-c76ef509d4d7",
          name: "SAMU",
          description:
            "O SAMU Serviço de Atendimento Móvel de Urgência, que foi implantado pela Secretária de Estado da Saúde de Santa Catarina, em parceria com o Ministério da Saúde e Secretarias Municipais, cuja missão é regular atendimentos de urgência e emergência em todo o Estado.",
          created_at: "2021-02-11 23:55:55",
          updated_at: "2021-02-11 23:55:55",
          is_deleted: false,
        },
      ]);
    });
};
