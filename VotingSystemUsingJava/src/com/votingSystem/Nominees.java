package com.votingSystem;

public class Nominees {

//    private int nomineeId;
    private String nomineeName;
    private int nomineeAge;

//    public int getNomineeId() {
//        return nomineeId;
//    }
//
//    public void setNomineeId(int nomineeId) {
//        this.nomineeId = nomineeId;
//    }

    public String getNomineeName() {
        return nomineeName;
    }

    public void setNomineeName(String nomineeName) {
        this.nomineeName = nomineeName;
    }

    public int getNomineeAge() {
        return nomineeAge;
    }

    public void setNomineeAge(int nomineeAge) {
        this.nomineeAge = nomineeAge;
    }

    @Override
    public String toString() {
        return "Nominee{" +
                "nomineeName='" + nomineeName + '\'' +
                ", nomineeAge=" + nomineeAge +
                '}';
    }
}
