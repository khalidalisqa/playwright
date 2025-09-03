Feature: Customer Registration

  Scenario: Fill out registration form successfully
    Given I open the registration page
    When I fill the registration form with valid data
    Then I should see the password field masked
    And I toggle the password visibility
    And I should see password strength "Strong"
    And I should see the Register button with correct text and color
