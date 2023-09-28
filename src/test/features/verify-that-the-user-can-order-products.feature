Feature: As a user I want to have the ability to order products

  Scenario Outline: Verify that user can login
    Given user on the login page
    When user enters correct '<username>' and password
    And user clicks on the login button
    Then user sees the state of his account with '<username>'

    Examples:
      | username                |
      | standard_user           |
      | locked_out_user         |
      | problem_user            |
      | performance_glitch_user |

  Scenario Outline: Verify that user can sort products by name and price
    Given user successfully login in
    When user change sort option to '<sort_option>'
    Then system shows sorted table by '<sort_option>' option

    Examples:
      | sort_option         |
      | Name (A to Z)       |
      | Name (Z to A)       |
      | Price (low to high) |
      | Price (high to low) |

  Scenario Outline: Verify that user can make order
    Given user successfully login in
    When user clicks on add to card button by '<product_name>'
    And user sees correct data on the basket page
    Then user clicks on the checkout button
    And user enter '<first_name>', '<last_name>' and '<postal_code>'
    And user clicks on the finish button
    And user sees a notification of successful order placement

    Examples:
      | product_name        | first_name | last_name | postal_code |
      | Sauce Labs Backpack | Maksym     | Potrus    | 49040       |