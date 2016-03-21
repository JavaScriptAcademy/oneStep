(function () {
  'use strict';

  // Dishes controller
  angular
    .module('dishes')
    .controller('DishesController', DishesController);

  DishesController.$inject = ['$scope', '$state', 'Authentication', 'dishService', 'dishResolve'];

  function DishesController ($scope, $state, Authentication, dishService, dish) {
    var vm = this;

    vm.authentication = Authentication;
    vm.dish = dish;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.addIngredient = addIngredient;
    vm.orders = [];
    vm.dishService = dishService;
    vm.createLocalOrder = createLocalOrder;

    function addIngredient(){
      vm.dish.ingredients = vm.dish.ingredients || [];
      vm.dish.ingredients.push({
        name:vm.dish.ingredient.name,
        price:vm.dish.ingredient.price,
        count:vm.dish.ingredient.count,
        weight:vm.dish.ingredient.weight
      });

      vm.dish.ingredient.name = '';
      vm.dish.ingredient.price = '';
      vm.dish.ingredient.count = '';
      vm.dish.ingredient.weight = '';
    }

    function createLocalOrder(){
      console.log("hello");
      let order = dishService.getData();
      vm.orders.push(vm.dish);
      console.log(vm.orders);
      vm.dishService.setData(vm.orders);
    }

    // Remove existing Dish
    function remove() {
      console.log(11);
      if (confirm('Are you sure you want to delete?')) {
        vm.dish.$remove($state.go('dishes.list'));
      }
    }

    // Save Dish
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dishForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.dish._id) {
        vm.dish.$update(successCallback, errorCallback);
      } else {
        vm.dish.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('dishes.view', {
          dishId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
