import java.util.Arrays;
import java.util.Comparator;

public class SearchFunction {

    // Linear Search
    public static Product linearSearch(Product[] products, String targetName) {

        for (Product product : products) {
            if (product.getProductName().equalsIgnoreCase(targetName)) {
                return product;
            }
        }

        return null;
    }

    // Binary Search
    public static Product binarySearch(Product[] products, String targetName) {

        int left = 0;
        int right = products.length - 1;

        while (left <= right) {

            int mid = (left + right) / 2;

            int compare =
                    products[mid].getProductName()
                            .compareToIgnoreCase(targetName);

            if (compare == 0) {
                return products[mid];
            }
            else if (compare < 0) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }

        return null;
    }

    public static void main(String[] args) {

        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Phone", "Electronics"),
                new Product(103, "Shoes", "Fashion"),
                new Product(104, "Watch", "Accessories")
        };

        System.out.println("Linear Search:");

        Product result1 =
                linearSearch(products, "Shoes");

        System.out.println(result1);

        Arrays.sort(products,
                Comparator.comparing(Product::getProductName));

        System.out.println("\nBinary Search:");

        Product result2 =
                binarySearch(products, "Shoes");

        System.out.println(result2);
    }
}