package com.yadlings.itemservice.Services;

import com.azure.storage.blob.BlobContainerClientBuilder;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@NoArgsConstructor
@Log4j2
public class CloudStorageService {
    @Value("${azure.storage.connection-string}")
    private String connectionString;
    @Value("${azure.storage.container-name}")
    private String container;
    @Value("${azure.storage.blob-endpoint}")
    private String containerUrl;
    /**
     * This will save the file to azure in storage container ${azure.storage.container-name}
     * @param file
     * @return link to the file
     * @throws Exception
     */
    public String uploadToAzureStorage(MultipartFile file) throws Exception{
        //To avoid conflict in azure storage we give the image a new long name
        //todo make image upload exception and throw it to the client nicely
        var fileName = UUID.randomUUID()+file.getName();
        new BlobContainerClientBuilder()
                .connectionString(connectionString)
                .containerName(container)
                .buildClient()
                .getBlobClient(fileName)
                .upload(file.getInputStream(),file.getSize());
        return String.format("%s/%s",containerUrl,fileName);
    }
    public void delete(String fileLink){
        //Length + 1 because of the / we added
        var fileName = fileLink.substring(containerUrl.length()+1);
        new BlobContainerClientBuilder()
                .connectionString(connectionString)
                .containerName(container)
                .buildClient()
                .getBlobClient(fileName)
                .delete();
    }
}
