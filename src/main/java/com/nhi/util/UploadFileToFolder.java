package com.nhi.util;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class UploadFileToFolder {

	private final String UPLOAD_FILE_OF_IMAGE_TO_FOLDER_BDS = "C:\\Users\\Admin\\Documents\\workspace-spring-tool-suite-4-4.20.1.RELEASE\\springboot-dat_lich_hen_bds\\src\\main\\resources\\static\\bds";
	private final String UPLOAD_FILE_OF_IMAGE_TO_FOLDER_NV = "C:\\Users\\Admin\\Documents\\workspace-spring-tool-suite-4-4.20.1.RELEASE\\springboot-dat_lich_hen_bds\\src\\main\\resources\\static\\nhanVien";

	
	public String uploadFileOfImageBDS(MultipartFile image) {
		try {
			Files.copy(image.getInputStream(), Paths.get(UPLOAD_FILE_OF_IMAGE_TO_FOLDER_BDS + File.separator, image.getOriginalFilename()),
					StandardCopyOption.REPLACE_EXISTING);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return image.getOriginalFilename();
	}
	
	public String uploadFileOfImageNV(MultipartFile image) {
		try {
			Files.copy(image.getInputStream(), Paths.get(UPLOAD_FILE_OF_IMAGE_TO_FOLDER_NV + File.separator, image.getOriginalFilename()),
					StandardCopyOption.REPLACE_EXISTING);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return image.getOriginalFilename();
	}
}
