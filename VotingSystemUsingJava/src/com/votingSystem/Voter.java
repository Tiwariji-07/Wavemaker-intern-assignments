package com.votingSystem;

public class Voter {

//    private int voterId;
    private String voterName;
    private int voterAge;
//    private int nomineeId;

//    public int getNomineeId() {
//        return nomineeId;
//    }

//    public void setNomineeId(int nomineeId) {
//        this.nomineeId = nomineeId;
//    }

//    public int getVoterId() {
//        return voterId;
//    }
//
//    public void setVoterId(int voterId) {
//        this.voterId = voterId;
//    }

    public String getVoterName() {
        return voterName;
    }

    public void setVoterName(String voterName) {
        this.voterName = voterName;
    }

    public int getVoterAge() {
        return voterAge;
    }

    public void setVoterAge(int voterAge) {
        this.voterAge = voterAge;
    }

    @Override
    public String toString() {
        return "Voter{" +
                "voterName='" + voterName + '\'' +
                ", voterAge=" + voterAge +
                '}';
    }
}
