const readline = require('readline');
const inventoryManager = require('./inventoryManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = () => {
  console.log('\n=== Gestión de Inventario ===');
  console.log('1. Ver todos los productos');
  console.log('2. Ver producto por ID');
  console.log('3. Agregar nuevo producto');
  console.log('4. Actualizar producto');
  console.log('5. Eliminar producto');
  console.log('6. Salir');
  rl.question('Seleccione una opción: ', (option) => {
    switch (option) {
      case '1':
        console.log(inventoryManager.getProducts());
        menu();
        break;
      case '2':
        rl.question('Ingrese el ID del producto: ', (id) => {
          const product = inventoryManager.getProductById(parseInt(id));
          console.log(product || 'Producto no encontrado');
          menu();
        });
        break;
      case '3':
        rl.question('Ingrese el nombre del producto: ', (name) => {
          rl.question('Ingrese el precio del producto: ', (price) => {
            rl.question('Ingrese la cantidad del producto: ', (quantity) => {
              const newProduct = inventoryManager.addProduct({ name, price: parseFloat(price), quantity: parseInt(quantity) });
              console.log('Producto agregado:', newProduct);
              menu();
            });
          });
        });
        break;
      case '4':
        rl.question('Ingrese el ID del producto a actualizar: ', (id) => {
          rl.question('Ingrese el nuevo nombre del producto: ', (name) => {
            rl.question('Ingrese el nuevo precio del producto: ', (price) => {
              rl.question('Ingrese la nueva cantidad del producto: ', (quantity) => {
                const updatedProduct = inventoryManager.updateProduct(parseInt(id), { name, price: parseFloat(price), quantity: parseInt(quantity) });
                console.log('Producto actualizado:', updatedProduct || 'Producto no encontrado');
                menu();
              });
            });
          });
        });
        break;
      case '5':
        rl.question('Ingrese el ID del producto a eliminar: ', (id) => {
          const deletedProduct = inventoryManager.deleteProduct(parseInt(id));
          console.log('Producto eliminado:', deletedProduct || 'Producto no encontrado');
          menu();
        });
        break;
      case '6':
        rl.close();
        break;
      default:
        console.log('Opción no válida');
        menu();
        break;
    }
  });
};

menu();