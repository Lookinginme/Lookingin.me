import zipfile
import os

def zip_folder(zip_filename, exclude_folders=('venv',)):
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk('.'):
            # Skip excluded folders
            if any(excl in root for excl in exclude_folders):
                continue
            for file in files:
                filepath = os.path.join(root, file)
                arcname = os.path.relpath(filepath, '.')
                zipf.write(filepath, arcname)

zip_folder('lookinginme_backup.zip')
print("✅ Backup created as lookinginme_backup.zip")
