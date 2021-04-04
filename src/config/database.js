// module.exports = {
//     dialect: 'postgres',
//     host: 'localhost',
//     username: 'casilva',
//     password: 'WebPetbdwp01@#',
//     database: 'bdwp',
//     define: {
//       timestamps: true,
//       underscored: true,
//       underscoredAll: true,
//     },
//   };

module.exports = {
  dialect: "postgres",
  host: "ec2-54-235-108-217.compute-1.amazonaws.com",
  username: "sqvawzxtkshqap",
  password: "4156bc4092d3337f11025cc03f3d989d9c3f42fbf71f8187b98d05edda539696",
  database: "d26kct279rfopl",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // This line will fix new error
    },
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
