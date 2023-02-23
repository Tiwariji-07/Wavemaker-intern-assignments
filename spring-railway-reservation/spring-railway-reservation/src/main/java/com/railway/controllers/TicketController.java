package com.railway.controllers;

import com.railway.model.Passenger;
import com.railway.model.Ticket;
import com.railway.services.TicketService;
import com.railway.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/ticket")
public class TicketController {

    @Autowired
    TicketService ticketService;

    @GetMapping
    public List<Ticket> getTicket(){
        return ticketService.getAllTickets();
    }

    @PostMapping("/create")
    public Ticket createTicket(@RequestBody Ticket ticket){
        return ticketService.createTicket(ticket);
    }

    @PutMapping("/update")
    public Ticket updateTicket(@RequestBody Ticket ticket){
        return ticketService.updateTicket(ticket);
    }

//    @DeleteMapping("/{id}")
//    public Ticket deleteTicket(@PathVariable("id") int id){
//        return ticketService.deleteTicket(id);
//    }

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable("id") int id){
        return ticketService.getTicketById(id);
    }

    @GetMapping("/{id}/passengers")
    public List<Passenger> getAllPassengers(@PathVariable("id") int id){
        return ticketService.getPassengersOfTicket(id);
    }
}
