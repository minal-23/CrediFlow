package com.natwest.PersonalLoanDocsService.model;

public class FileProps {
    private String fileName;
    private byte[] data;
    private String contentType;

    public FileProps() {
    }

    public FileProps(String fileName, byte[] data, String contentType) {
        this.fileName = fileName;
        this.data = data;
        this.contentType = contentType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
