package com.railway.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="ticket")
public class Ticket {

    @Id
    @Column(name = "ticket_id")
    private int ticketId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "train_id", referencedColumnName = "train_id")
    private Train train;

    @Column(name = "status")
    private String status;

    @Column(name = "travel_date")
    private Date travelDate;

    @Column(name = "fare_amount")
    private int fareAmount;

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Train getTrain() {
        return train;
    }

    public void setTrain(Train train) {
        this.train = train;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(Date travelDate) {
        this.travelDate = travelDate;
    }

    public int getFareAmount() {
        return fareAmount;
    }

    public void setFareAmount(int fareAmount) {
        this.fareAmount = fareAmount;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", user=" + user +
                ", train=" + train +
                ", status='" + status + '\'' +
                ", travelDate=" + travelDate +
                ", fareAmount=" + fareAmount +
                '}';
    }
}
