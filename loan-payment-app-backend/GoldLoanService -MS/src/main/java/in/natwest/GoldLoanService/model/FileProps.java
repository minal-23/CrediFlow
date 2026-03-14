package in.natwest.GoldLoanService.model;

public class FileProps {
    private String fileName;
    private byte[] filedata;
    private String contentType;

    public FileProps() {
    }

    public FileProps(String fileName, byte[] filedata, String contentType) {
        this.fileName = fileName;
        this.filedata = filedata;
        this.contentType = contentType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFiledata() {
        return filedata;
    }

    public void setFiledata(byte[] filedata) {
        this.filedata = filedata;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
