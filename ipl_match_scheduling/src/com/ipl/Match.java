package com.ipl;

import java.util.Date;

public class Match {

    private Team team1;
    private Team team2;
    private Date matchDate;
    private Boolean matchPlayed;
    private Venue matchVenue;

    public Venue getMatchVenue() {
        return matchVenue;
    }

    public void setMatchVenue(Venue matchVenue) {
        this.matchVenue = matchVenue;
    }

    public Team getTeam1() {
        return team1;
    }

    public void setTeam1(Team team1) {
        this.team1 = team1;
    }

    public Team getTeam2() {
        return team2;
    }

    public void setTeam2(Team team2) {
        this.team2 = team2;
    }

    public Date getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(Date matchDate) {
        this.matchDate = matchDate;
    }

    public Boolean getMatchPlayed() {
        return matchPlayed;
    }

    public void setMatchPlayed(Boolean matchPlayed) {
        this.matchPlayed = matchPlayed;
    }

    @Override
    public String toString() {
        return "Match{" +
                "team1=" + team1 +
                ", team2=" + team2 +
                ", matchDate=" + matchDate +
                ", matchPlayed=" + matchPlayed +
                ", matchVenue=" + matchVenue +
                '}';
    }
}
