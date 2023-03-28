package com.finwise.implementations;
import java.io.*;

import com.finwise.models.TransactionTable;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;

import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Table;

public class PdfGenerator {

    public byte[] generate(TransactionTable transactionTable){
        ByteArrayOutputStream target = new ByteArrayOutputStream();
        ConverterProperties converterProperties = new ConverterProperties();
        converterProperties.setBaseUri("http://localhost:8080");
        HtmlConverter.convertToPdf(transactionTable.getTable(),target,converterProperties);
        byte[] bytes = target.toByteArray();
        return bytes;
    }

}
