package com.railway.model;

import javax.persistence.*;

@Entity
@Table(name = "passenger")
public class Passenger {
    @Id
    @Column(name = "passenger_id")
    private int passengerId;
    @Column(name = "pnr_no")
    private int pnrNo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ticket_id", referencedColumnName = "ticket_id")
    private Ticket ticket;
    @Column(name = "name")
    private String passengerName;
    @Column(name = "gender")
    private String gender;
    @Column(name = "age")
    private int age;
    @Column(name = "reservation_status")
    private String reservationStatus;

    public int getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(int passengerId) {
        this.passengerId = passengerId;
    }

    public int getPnrNo() {
        return pnrNo;
    }

    public void setPnrNo(int pnrNo) {
        this.pnrNo = pnrNo;
    }


    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(String reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    @Override
    public String toString() {
        return "Passenger{" +
                "passengerId=" + passengerId +
                ", pnrNo=" + pnrNo +
                ", ticket=" + ticket +
                ", passengerName='" + passengerName + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                ", reservationStatus='" + reservationStatus + '\'' +
                '}';
    }
}
