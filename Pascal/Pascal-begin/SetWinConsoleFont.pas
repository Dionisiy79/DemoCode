// https://wiki.freepascal.org/Lazarus_with_FPC3.0_without_UTF-8_mode#Problem_System_encoding_and_Console_encoding_.28Windows.29
// https://stackoverflow.com/questions/24762413/how-to-set-console-font
unit SetWinConsoleFont;

interface

uses Windows;

implementation

Const
  LF_FACESIZE = 32;

Type
  CONSOLE_FONT_INFOEX = record
    cbSize     : longword;
    nFont      : longword;
    dwFontSize : COORD;
    FontFamily : longword;
    FontWeight : longword;
    FaceName   : array [0..LF_FACESIZE-1] of WCHAR;
  end;

{ Only supported in Vista and onwards!}

function SetCurrentConsoleFontEx(hConsoleOutput: HANDLE;
                                 bMaximumWindow: BOOL;
                                 var CONSOLE_FONT_INFOEX): BOOL; stdcall; external kernel32;

var
  font1: CONSOLE_FONT_INFOEX;

initialization
  // SetConsoleOutputCP(DefaultSystemCodePage);
  // SetTextCodePage(Output, DefaultSystemCodePage);

  FillChar(font1, SizeOf(CONSOLE_FONT_INFOEX), 0);
  font1.cbSize := SizeOf(CONSOLE_FONT_INFOEX);
//  font1.FaceName := 'Consolas';
  font1.FaceName := 'Lucida Console';  //use Lucida Console for Win XP
  font1.FontWeight := 400;
  font1.dwFontSize.Y := 16;

  SetCurrentConsoleFontEx(StdOutputHandle, False, font1);
end.
