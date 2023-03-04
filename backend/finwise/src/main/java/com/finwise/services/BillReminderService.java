package com.finwise.services;

import com.finwise.models.Bill;

import java.util.List;

public interface BillReminderService {
    List<Bill> getAllReminders(int userId);

    Bill createBillReminder(Bill bill,int userId);

    Bill updateBillReminder(Bill bill,int userId);

    Bill deleteBillReminder(int id);

    Bill getBillReminderById(int id);
}
