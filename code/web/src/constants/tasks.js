export const TypeID = {
  Yrd: 1,
  Cln: 2,
  Rpr: 3,
  Ato: 4,
  Tch: 5,
  Msc: 6
}

const api = process.env.REACT_APP_DATA_API;

export const Types = [
    {id: TypeID.Yrd, abbr: "Yrd", name: "Yard Work", img: `${api}/img/static/yard.jpeg`},
    {id: TypeID.Cln, abbr: "Cln", name: "Cleaning", img: `${api}/img/static/cleaning.png`},
    {id: TypeID.Rpr, abbr: "Rpr", name: "Repair", img: `${api}/img/static/repair.jpeg`},
    {id: TypeID.Ato, abbr: "Ato", name: "Auto", img: `${api}/img/static/auto.jpeg`},
    {id: TypeID.Tch, abbr: "Tch", name: "Tech", img: `${api}/img/static/tech.jpeg`},
    {id: TypeID.Msc, abbr: "Msc", name: "Misc", img: `${api}/img/static/taskitthumbnail.png`},
];

export const GetType = (id) => {
  return Types[id - 1];
}
