import { downloadAsync, documentDirectory, readAsStringAsync, deleteAsync, writeAsStringAsync } from "expo-file-system"
import { Alert } from "react-native"

interface FileManagerState {
  downloadProgress: number
}

export default class FileManager {
  callback: (downloadProgress: { totalBytesWritten: number, totalBytesExpectedToWrite: number }) => void

  public state: FileManagerState = {
    downloadProgress: 0
  }

  private setState = (state: FileManagerState) => {
    this.state = state
  }
  
  static async saveFile(fileName: string, content: string): Promise<string> {
    const path = documentDirectory + fileName
    await writeAsStringAsync(path, content)
    return path
  }


  async downloadAndStoreFile(url: string, path: string): Promise<string> {
    this.callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      this.setState({
        downloadProgress: progress,
      });
    };

    try {
      const request = await downloadAsync(url, documentDirectory + path, {})
    } catch (e) {
      console.warn(e)
      Alert.alert("Error", "Failed to download file")
    }

    return documentDirectory + path
  }

  async readFile(path: string): Promise<string> {
    return await readAsStringAsync(path)
  }

  async deleteFile(path: string): Promise<void> {
    await deleteAsync(path)
  }
}
