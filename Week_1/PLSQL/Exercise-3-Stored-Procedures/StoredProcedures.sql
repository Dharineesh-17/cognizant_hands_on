-- =====================================================
-- Exercise 3 : Stored Procedures
-- =====================================================

-- =====================================================
-- Scenario 1
-- Process Monthly Interest
-- Apply 1% interest to all Savings Accounts
-- =====================================================

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
AS
BEGIN
    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01)
    WHERE AccountType = 'Savings';

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(
        'Monthly interest processed successfully.'
    );
END;
/

-- Execute
BEGIN
    ProcessMonthlyInterest;
END;
/

-- =====================================================
-- Scenario 2
-- Update Employee Bonus
-- Add bonus percentage to salary
-- =====================================================

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus
(
    p_department IN VARCHAR2,
    p_bonus_percent IN NUMBER
)
AS
BEGIN
    UPDATE Employees
    SET Salary = Salary +
                (Salary * p_bonus_percent / 100)
    WHERE Department = p_department;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(
        'Employee bonus updated successfully.'
    );
END;
/

-- Execute Example
BEGIN
    UpdateEmployeeBonus('IT', 10);
END;
/

-- =====================================================
-- Scenario 3
-- Transfer Funds Between Accounts
-- =====================================================

CREATE OR REPLACE PROCEDURE TransferFunds
(
    p_from_account IN NUMBER,
    p_to_account   IN NUMBER,
    p_amount       IN NUMBER
)
AS
    v_balance NUMBER;
BEGIN

    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID = p_from_account;

    IF v_balance >= p_amount THEN

        UPDATE Accounts
        SET Balance = Balance - p_amount
        WHERE AccountID = p_from_account;

        UPDATE Accounts
        SET Balance = Balance + p_amount
        WHERE AccountID = p_to_account;

        COMMIT;

        DBMS_OUTPUT.PUT_LINE(
            'Fund transfer successful.'
        );

    ELSE

        DBMS_OUTPUT.PUT_LINE(
            'Insufficient balance.'
        );

    END IF;

END;
/

-- Execute Example
BEGIN
    TransferFunds(101, 102, 500);
END;
/