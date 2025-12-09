Feature: Ecommerce Validation
  
  @Regression
  Scenario: Placing the order
    Given Login in to Ecommerce2 application with "anshika@gmail.com" and "Iamking@000"
    Then Verify error meaasage is displayed

    @Regression
  Scenario Outline: Placing the order
    Given Login in to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error meaasage is displayed

    Examples:
        | username           | password |
        | anshika@gmail.com  | Iamking@000  |
        | hello@gmail.com  | Iamhello@000  |

