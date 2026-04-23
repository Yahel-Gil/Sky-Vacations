class ReportModel {
    public vacationId: number;
    public destinationName: string;
    public totalLikes: number;

    public constructor(report: ReportModel) {
        this.vacationId = report.vacationId;
        this.destinationName = report.destinationName;
        this.totalLikes = report.totalLikes;
    }
}

export default ReportModel;