public class FinancialForecast {

    // Recursive method to calculate future value
    public static double forecast(double currentValue,
                                  double growthRate,
                                  int years) {

        // Base case
        if (years == 0) {
            return currentValue;
        }

        // Recursive case
        return forecast(currentValue * (1 + growthRate),
                        growthRate,
                        years - 1);
    }

    public static void main(String[] args) {

        double currentValue = 10000;
        double growthRate = 0.10; // 10%
        int years = 5;

        double futureValue =
                forecast(currentValue, growthRate, years);

        System.out.printf(
                "Predicted value after %d years: %.2f",
                years, futureValue);
    }
}