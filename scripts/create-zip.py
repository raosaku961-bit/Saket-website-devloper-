#!/usr/bin/env python3
import os
import zipfile
import sys

def make_zip(output_filename="saket-web-developer.zip", source_dir="."):
    ignore_dirs = {
        'node_modules',
        '.git',
        'dist',
        '.aistudio',
        '__pycache__',
        '.cache',
    }
    ignore_files = {
        output_filename,
        'bun.lock',
        '.DS_Store',
    }

    print(f"Creating {output_filename}...")
    file_count = 0

    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Prune ignored directories
            dirs[:] = [d for d in dirs if d not in ignore_dirs and not d.startswith('.git')]
            
            for file in files:
                if file in ignore_files or file.endswith('.log'):
                    continue
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, source_dir)
                zipf.write(file_path, rel_path)
                file_count += 1
                
    print(f"Successfully packaged {file_count} files into {output_filename}")
    size_mb = os.path.getsize(output_filename) / (1024 * 1024)
    print(f"Archive size: {size_mb:.2f} MB")

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else "saket-web-developer.zip"
    make_zip(target)
