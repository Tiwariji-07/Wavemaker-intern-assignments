package com.finwise.controllers;

import com.finwise.implementations.PdfGenerator;
import com.finwise.models.BudgetPeriod;
import com.finwise.models.ExpenseBudget;
import com.finwise.models.TransactionTable;
import com.finwise.models.Transactions;
import com.finwise.services.ExpenseBudgetService;
import com.finwise.services.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "{user_id}/transactions")
public class TransactionsController {
    @Autowired
    TransactionsService transactionsService;
//    @Autowired
    PdfGenerator pdfGenerator;
    @GetMapping
    public List<Transactions> getTransactions(@PathVariable("user_id") int userId){
        return transactionsService.getAllTransactions(userId);
    }

    @PostMapping("{tran_type_id}/create")
    public Transactions createTransactions(@RequestBody Transactions transactions,@PathVariable("user_id") int userId,
                                           @PathVariable("tran_type_id") int tranTypeId){

        return transactionsService.createTransactions(transactions,userId,tranTypeId);
    }

    @PutMapping("{tran_type_id}/update")
    public Transactions updateTransactions(@RequestBody Transactions transactions,@PathVariable("user_id") int userId,
                                           @PathVariable("tran_type_id") int tranTypeId){
        return transactionsService.updateTransactions(transactions,userId,tranTypeId);
    }

    @DeleteMapping("/{id}")
    public Transactions deleteTransactions(@PathVariable("id") int id){
        return transactionsService.deleteTransactions(id);
    }

    @GetMapping("/{id}")
    public Transactions getTransactionsById(@PathVariable("id") int id){
        return transactionsService.getTransactionsById(id);
    }

    @PostMapping("/period")
    public List<Transactions> getTransactionsOfPeriod(@RequestBody BudgetPeriod budgetPeriod, @PathVariable("user_id") int userId){
        return transactionsService.getTransactionOfPeriod(budgetPeriod,userId);
    }

    @PostMapping("/download")
    public ResponseEntity<?> getPDF(@RequestBody TransactionTable transactionTable){
        String html = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "<style>\n" +
                ".table {\n" +
                "  font-family: Arial, Helvetica, sans-serif;\n" +
                "  border-collapse: collapse;\n" +
                "  width: 100%;\n" +
                "}\n" +
                "\n" +
                ".table td, .table th {\n" +
                "  border: 1px solid #ddd;\n" +
                "  padding: 8px;\n" +
                "}\n" +
                "\n" +
                ".table tr:nth-child(even){background-color: #f2f2f2;}\n" +
                "\n" +
                ".table tr:hover {background-color: #ddd;}\n" +
                "\n" +
                ".table th {\n" +
                "  padding-top: 12px;\n" +
                "  padding-bottom: 12px;\n" +
                "  text-align: left;\n" +
                "  background-color: #04AA6D;\n" +
                "  color: white;\n" +
                "}\n" +
                "</style>\n" +
                "</head>\n" +
                "<body>";
        html+=transactionTable.getTable();
        html+="</body>\n" +
                "    </html>";
        transactionTable.setTable(html);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=order.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(transactionsService.generate(transactionTable));
    }

}
