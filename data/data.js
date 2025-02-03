let Cars = [
    {
      model: "Miata",
      make: "Mazda",
      year: 1994,
      color: "blue",
      mileage: 100000
    },
    {
      model: "Miata2",
      make: "Mazda",
      year: 1995,
      color: "black",
      mileage: 120000
    },
    {
      model: "Prius",
      make: "Toyota",
      year: 2023,
      color: "grey",
      mileage: 20000
    },
    {
      model: "Land Cruiser",
      make: "Toyota",
      year: 1997,
      color: "black",
      mileage: 85000
    },
    {
      model: "Outback",
      make: "Subaru",
      year: 2008,
      color: "grey",
      mileage: 100000
    }
  ]

const getAll = () => {
  return Cars;
}

const getItem = (model) => {
  return Cars.find((item) => {
    return item.model.toLowerCase() === model.toLowerCase();
  });
};
  
export { getAll, getItem }