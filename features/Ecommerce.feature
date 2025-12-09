Feature: Ecommerce Validation
  
  @Validation
  Scenario: Placing the order
    Given Login in to ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When Add "zara coat 3" to cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter valid details and place the order
    Then Verify order present in order history page