INSERT INTO i_audit.transaction (account_id, transaction_type_id, category_type_id, transaction_date, transaction_value)
VALUES (4, 2, 10, '2023-06-05 14:26:00', 7000.50);

INSERT INTO i_audit.transaction (account_id, transaction_type_id, category_type_id, transaction_date, transaction_value)
VALUES (4, 2, 10, '2023-06-05 14:26:00', 8000.23);


INSERT INTO i_audit.transaction (account_id, transaction_type_id, category_type_id, transaction_date, transaction_value)
VALUES (4, 2, 10, '2023-06-05 14:26:00', 9000.00);


INSERT INTO i_audit.transaction (account_id, transaction_type_id, category_type_id, transaction_date, transaction_value)
VALUES (4, 2, 10, '2023-06-05 14:26:00', 10000.00);



#
# UPDATE i_audit.transaction
# SET transaction_type_id = 2,
#     category_type_id = 10,
#     transaction_date = '2019-06-05 14:26:00',
#     transaction_value = 51
# WHERE transaction_id = 51 AND account_id = 4;