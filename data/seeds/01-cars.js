// STRETCH
exports.seed = function(knex) {
    return knex('cars').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('cars').insert([
          {vin: 'abcdefg1234567890', make: 'toyota', model: 'camery', mileage: 1000},
          {vin: 'abcdefg1234567891', make: 'hundai', model: 'accent', mileage: 25000, title: 'salvage'},
          {vin: 'abcdefg1234567892', make: 'dodge', model: 'ram', mileage: 0, title: 'clean', transmission: 'manual'}
        ]);
      });
  };