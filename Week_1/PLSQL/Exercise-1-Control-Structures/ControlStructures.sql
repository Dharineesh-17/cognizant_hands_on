-- =====================================================
-- Exercise 1 : Control Structures
-- =====================================================

-- =====================================================
-- Scenario 1:
-- Apply 1% discount to loan interest rates
-- for customers above 60 years old
-- =====================================================

BEGIN
    FOR cust IN (
        SELECT CustomerID
        FROM Customers
        WHERE Age > 60
    )
    LOOP
        UPDATE Loans
        SET InterestRate = InterestRate - 1
        WHERE CustomerID = cust.CustomerID;
    END LOOP;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(
        'Interest rates updated successfully.'
    );
END;
/

-- =====================================================
-- Scenario 2:
-- Promote customers to VIP status
-- if balance > 10000
-- =====================================================

BEGIN
    FOR cust IN (
        SELECT CustomerID
        FROM Customers
        WHERE Balance > 10000
    )
    LOOP
        UPDATE Customers
        SET IsVIP = 'TRUE'
        WHERE CustomerID = cust.CustomerID;
    END LOOP;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(
        'VIP status updated successfully.'
    );
END;
/

-- =====================================================
-- Scenario 3:
-- Send reminders for loans due
-- within next 30 days
-- =====================================================

BEGIN
    FOR loan_rec IN (
        SELECT CustomerID,
               LoanID,
               DueDate
        FROM Loans
        WHERE DueDate BETWEEN SYSDATE
                          AND SYSDATE + 30
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Customer '
            || loan_rec.CustomerID
            || ' has Loan '
            || loan_rec.LoanID
            || ' due on '
            || loan_rec.DueDate
        );
    END LOOP;
END;
/