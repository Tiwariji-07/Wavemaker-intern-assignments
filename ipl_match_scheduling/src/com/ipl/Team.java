package com.ipl;

public class Team {
    private String teamName;
    private Boolean isPlaying;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Boolean getPlaying() {
        return isPlaying;
    }

    public void setPlaying(Boolean playing) {
        isPlaying = playing;
    }

    @Override
    public String toString() {
        return "Team{" +
                "teamName='" + teamName + '\'' +
                ", isPlaying=" + isPlaying +
                '}';
    }
}
